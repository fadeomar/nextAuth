export default function SingleProfilePage({ params }: any) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>user Profile</h1>
      <hr />
      <p className="text-4xl">
        profile page
        <span className="p-2 ml-2 rounded bg-blue-400"> {params?.id}</span>
      </p>
    </div>
  );
}
