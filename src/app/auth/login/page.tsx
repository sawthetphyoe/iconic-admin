import LoginForm from "@/components/LoginForm";
import NavBar from "@/components/NavBar";
import LoginFooter from "@/components/LoginFooter";

const LoginPage = () => {
  return (
    <main className={"w-full min-h-[800px] h-screen relative"}>
      <NavBar className={"px-6"} />

      <section className={"flex flex-col gap-8 items-center w-full mt-40"}>
        <h1 className={"text-primary font-bold text-2xl m-0"}>Login</h1>
        <LoginForm />
      </section>

      <LoginFooter />
    </main>
  );
};

export default LoginPage;
