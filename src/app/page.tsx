import ButtonRedirect from "@/components/commom/button-redirect";
import Image from "next/image";
import Link from "next/link";
// import { useRouter } from "next/navigation";

export default function Home() {
  // const router = useRouter();

  // const handleLogin = () => {
  //   router.push("/login");
  // };

  return (
    <main className="h-dvh">
      <h1 className="text-4xl">Xin chào các bạn nhỏ</h1>

      <div className="w-[700px] h-[700px] bg-amber-100">
        <Image
          src={
            "https://images.unsplash.com/photo-1763244737829-5e987d40228c?q=80&w=1503&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          alt="celine-cao"
          width={800}
          height={600}
        />
        {/* <Image
          src={"/images/celine-cao.jpg"}
          alt="celine-cao"
          width={800}
          height={600}
        /> */}
      </div>

      <Link href={"/login"}>Go Login</Link>
      <Link href={"/register"}>Go Register</Link>
      {/* <Button onClick={handleLogin}>Go Login</Button> */}
      <ButtonRedirect href="/login">Go Login</ButtonRedirect>
    </main>
  );
}
