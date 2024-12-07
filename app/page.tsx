export default function Home() {
  return (
    <>
      <div className="h-screen flex flex-col text-center space-y-24">
        <section className="h-[calc(100dvh-10rem)] flex flex-col justify-end px-4">
          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-extralight mb-4 tracking-tight">
            Nader Chatti
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground">
            Software Engineer & Developer
          </p>
        </section>
        <section className="h-[calc(100dvh-10rem)] flex flex-col justify-center items-center px-4">
          <div className="w-full max-w-lg items-center justify-center">
          </div>
        </section>
      </div>
    </>
  );
}
