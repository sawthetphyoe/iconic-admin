import Link from "next/link";
import MainLayout from "@/components/MainLayout";

export default function NotFound() {
  return (
    <MainLayout>
      <div
        className={
          "w-full h-full flex flex-col items-center justify-center gap-10 !py-24"
        }
      >
        <h1 className={"text-2xl font-bold"}>Not Found</h1>
        <div className={"flex flex-col justify-center items-center gap-2"}>
          <p>We can&apos;t seen to find the page you are looking for.</p>
          <p className={"font-semibold"}>Or</p>
          <p>The developer is too lazy to implement this page. LOL!</p>
        </div>
        <Link href="/" className="link link-hover">
          Return Home
        </Link>
      </div>
    </MainLayout>
  );
}
