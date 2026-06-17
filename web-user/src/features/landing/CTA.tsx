// features/landing/CTA.tsx
 import Link from "next/link"; 
 export default function CTA(){ 
  return ( 
     <section className="relative overflow-hidden bg-[#031B4E] py-24"> 
     <div className="absolute -left-32 top-10 h-80 w-80 rounded-full bg-blue-400/20 blur-3xl" />
      <div className="absolute -right-32 bottom-10 h-80 w-80 rounded-full bg-blue-300/20 blur-3xl" /> 
      <div className="relative mx-auto max-w-4xl px-6 text-center"> <h2 className="text-5xl font-bold tracking-tight text-white"> Ready to eliminate banking fraud? </h2> <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-blue-100"> Join institutions using Sentinel AI to detect threats, verify identities, and stop fraud before transactions complete. </p> <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row"> <Link href="/login" className="cursor-pointer rounded-2xl bg-white px-8 py-4 font-bold text-[#031B4E] shadow-lg transition hover:scale-[1.03]" > Get Started </Link> <button className="cursor-pointer rounded-2xl border border-white/30 px-8 py-4 font-bold text-white transition hover:scale-[1.03] hover:bg-white hover:text-[#031B4E]"> Contact Sales </button> 
      </div> </div> </section> 
      ); 
      }