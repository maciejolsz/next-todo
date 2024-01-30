import Header from "@/app/ui/workshop/header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-screen">
      <div className="content">
        <Header />

        <section>
          {children}
        </section>

        {/*<Footer />*/}
      </div>
    </div>
  );
}
