const UnderConstruction = () => {
  return (
    <div className="under-c_container absolute z-10 flex h-screen w-screen items-center justify-center bg-black bg-opacity-50">
      <div className="under-c_content  flex h-auto w-auto flex-col items-center justify-center gap-10 rounded bg-white p-5 text-black ">
        <img
          className="w-1/3"
          src="https://upload.wikimedia.org/wikipedia/commons/d/d9/Under_construction_animated.gif"
          alt=""
        />
        <h1 className="text-2xl font-black">האתר סגור כעת לרגל שיפוצים</h1>
        <div className="flex flex-col gap-4">
          <a
            className="rounded bg-red-600 p-3 text-white hover:bg-red-300"
            href="https://discord.gg/r9xZR8tf"
            target="_blank"
          >
            קישור לשרת הדיסקורד של הקהילה
          </a>
          <a
            className="rounded bg-red-600 p-3 text-center text-white hover:bg-red-300"
            href="https://github.com/lirantal/awesome-opensource-israel"
            target="_blank"
          >
            קישור לריפוזיטורי בגיטהאב
          </a>
        </div>
      </div>
    </div>
  );
};

export default UnderConstruction;
