export default function Logo() {
  return (
    <a href="#home" className="flex items-center gap-3">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-lg">
        <span className="text-lg font-extrabold text-white">
          VB
        </span>
      </div>

      <div>
        <h2 className="text-xl font-bold text-white">
          Vanguard
        </h2>

        <p className="-mt-1 text-xs tracking-[0.25em] uppercase text-blue-400">
          Business Services
        </p>
      </div>
    </a>
  );
}