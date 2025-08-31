"use client"
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen relative overflow-hidden m-0 p-0 w-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950">
      {/* Global CSS Reset */}
      <style jsx global>{`
        html, body, #__next {
          margin: 0 !important;
          padding: 0 !important;
          height: 100%;
          overflow-x: hidden;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>

      {/* Animated Background Orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-purple-600/40 to-transparent blur-3xl -top-48 -left-48 animate-float-1"></div>
        <div className="absolute w-80 h-80 rounded-full bg-gradient-to-r from-blue-600/30 to-transparent blur-3xl top-20 -right-40 animate-float-2"></div>
        <div className="absolute w-[32rem] h-[32rem] rounded-full bg-gradient-to-r from-emerald-600/20 to-transparent blur-3xl -bottom-64 left-1/3 animate-float-3"></div>
        <div className="absolute w-72 h-72 rounded-full bg-gradient-to-r from-red-500/30 to-transparent blur-3xl top-3/5 -left-36 animate-float-4"></div>
        <div className="absolute w-64 h-64 rounded-full bg-gradient-to-r from-pink-600/40 to-transparent blur-3xl top-1/4 right-1/4 animate-float-5"></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-grid-pattern"></div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-8">
        <div className="bg-gradient-to-br from-white/8 to-white/3 backdrop-blur-xl border border-white/10 rounded-3xl p-16 max-w-4xl w-full shadow-2xl relative overflow-hidden">
          {/* Glass Container Top Border */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>

          {/* Header Section */}
          <div className="text-center mb-16">
            <div className="inline-block mb-6">
              <span className="text-8xl inline-block animate-pulse filter drop-shadow-2xl">🎓</span>
            </div>
            <h1 className="text-6xl font-extrabold bg-gradient-to-r from-white via-purple-300 to-blue-300 bg-clip-text text-transparent mb-4 tracking-tight">
              School Management
            </h1>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent mb-6">
              Directory System
            </h2>
            <p className="text-white/70 text-xl font-light max-w-2xl mx-auto leading-relaxed">
              Manage educational institutions with ease. Add new schools to the directory or browse existing institutions in your area.
            </p>
          </div>

          {/* Navigation Buttons */}
          <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
            
            {/* View Schools Button */}
            <button 
              onClick={() => router.push('/showSchools')}
              className="group relative inline-flex items-center justify-center gap-4 bg-gradient-to-r from-blue-600/80 via-indigo-700/90 to-purple-800 text-white border-0 rounded-2xl px-12 py-6 text-xl font-bold cursor-pointer transition-all duration-500 shadow-xl shadow-blue-600/30 hover:shadow-blue-600/50 hover:-translate-y-2 hover:scale-105 uppercase tracking-wide overflow-hidden min-w-[280px]"
            >
              <span className="text-3xl z-10 group-hover:animate-bounce">🏫</span>
              <div className="z-10 text-center">
                <div className="font-extrabold text-xl">View Schools</div>
                <div className="text-sm font-medium opacity-80">Browse Directory</div>
              </div>
              <div className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:animate-shimmer"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>

            {/* Add School Button */}
            <button 
              onClick={() => router.push('/addSchool')}
              className="group relative inline-flex items-center justify-center gap-4 bg-gradient-to-r from-emerald-600/80 via-green-700/90 to-teal-800 text-white border-0 rounded-2xl px-12 py-6 text-xl font-bold cursor-pointer transition-all duration-500 shadow-xl shadow-emerald-600/30 hover:shadow-emerald-600/50 hover:-translate-y-2 hover:scale-105 uppercase tracking-wide overflow-hidden min-w-[280px]"
            >
              <span className="text-3xl z-10 group-hover:animate-bounce">✨</span>
              <div className="z-10 text-center">
                <div className="font-extrabold text-xl">Add School</div>
                <div className="text-sm font-medium opacity-80">Create New Entry</div>
              </div>
              <div className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:animate-shimmer"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-teal-600/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes float-1 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); opacity: 0.7; }
          25% { transform: translate(50px, -50px) rotate(90deg); opacity: 0.5; }
          50% { transform: translate(-30px, 30px) rotate(180deg); opacity: 0.8; }
          75% { transform: translate(-50px, -20px) rotate(270deg); opacity: 0.6; }
        }
        @keyframes float-2 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); opacity: 0.6; }
          25% { transform: translate(-40px, 60px) rotate(90deg); opacity: 0.8; }
          50% { transform: translate(40px, -40px) rotate(180deg); opacity: 0.5; }
          75% { transform: translate(60px, 20px) rotate(270deg); opacity: 0.7; }
        }
        @keyframes float-3 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); opacity: 0.5; }
          25% { transform: translate(30px, -70px) rotate(90deg); opacity: 0.7; }
          50% { transform: translate(-50px, 50px) rotate(180deg); opacity: 0.6; }
          75% { transform: translate(-30px, -30px) rotate(270deg); opacity: 0.8; }
        }
        @keyframes float-4 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); opacity: 0.8; }
          25% { transform: translate(-60px, -40px) rotate(90deg); opacity: 0.5; }
          50% { transform: translate(25px, 60px) rotate(180deg); opacity: 0.7; }
          75% { transform: translate(40px, -25px) rotate(270deg); opacity: 0.6; }
        }
        @keyframes float-5 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); opacity: 0.7; }
          25% { transform: translate(-20px, -50px) rotate(90deg); opacity: 0.6; }
          50% { transform: translate(35px, 35px) rotate(180deg); opacity: 0.8; }
          75% { transform: translate(-35, 15px) rotate(270deg); opacity: 0.5; }
        }
        @keyframes shimmer {
          0% { left: -100%; }
          100% { left: 100%; }
        }
        .animate-float-1 { animation: float-1 20s infinite ease-in-out; }
        .animate-float-2 { animation: float-2 20s infinite ease-in-out; animation-delay: -7s; }
        .animate-float-3 { animation: float-3 20s infinite ease-in-out; animation-delay: -14s; }
        .animate-float-4 { animation: float-4 20s infinite ease-in-out; animation-delay: -3s; }
        .animate-float-5 { animation: float-5 20s infinite ease-in-out; animation-delay: -10s; }
        .animate-shimmer { animation: shimmer 3s infinite; }
        .bg-grid-pattern {
          background-image: 
            linear-gradient(rgba(255, 255, 255, 0.015) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.015) 1px, transparent 1px);
          background-size: 60px 60px;
        }
      `}</style>
    </div>
  );
}
