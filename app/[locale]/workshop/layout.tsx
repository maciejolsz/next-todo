import PageHeader from "@/app/ui/workshop/page-header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full">
      <div className="content">
        <PageHeader />
        <section>
          {children}
        </section>
      </div>
    </div>
  );
}
