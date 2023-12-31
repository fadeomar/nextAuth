import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  User.updateMany({})
    .then(() => {
      console.log("Data migration successful.");
    })
    .catch((error) => {
      console.error("Data migration failed:", error);
    });
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    console.log({ hashedToken, emailType });

    if (emailType === "VERIFY") {
      try {
        // User.updateOne(
        //   { _id: userId },
        //   {
        //     verifyToken: hashedToken,
        //     verifyTokenExpiry: Date.now() + 3600000,
        //   }
        // )

        const user = await User.findByIdAndUpdate(userId, {
          verifyToken: hashedToken,
          verifyTokenExpiry: Date.now() + 3600000,
        });
        console.log({ user });
      } catch (error) {
        console.log({ error });
      }
    } else if (emailType === "REST") {
      await User.findByIdAndUpdate(
        userId,
        {
          forgotPasswordToken: hashedToken,
          forgotPasswordTokenExpiry: Date.now() + 3600000,
        },
        { new: true, runValidators: true }
      );
    }

    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "09d3c2883dce89",
        pass: "087340290d3a69",
        // add these to env
      },
    });

    const mailOptions = {
      from: "hitesh@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `<p>Click <a href="${
        process.env.domain
      }/verifyemail?token=${hashedToken}">here</a> to ${
        emailType === "VERIFY" ? "Verify your email" : "Reset your password"
      }
      or copy the link <br /> ${
        process.env.domain
      }/verifyemail?token=${hashedToken}
      </p>`,
    };

    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};
