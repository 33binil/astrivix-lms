export default function Tab({ tabData, field, setField }) {
  return (
    <div className="flex bg-slate-200 dark:bg-slate-800 p-1 gap-x-1 my-6 rounded-full max-w-max border border-slate-300 dark:border-slate-700">
      {
        tabData.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setField(tab.type)}
            className={`${
              field === tab.type
                ? "bg-blue-600 text-white"
                : "bg-transparent text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
              } py-2 px-5 rounded-full transition-all duration-200`}
          >
            {tab?.tabName}
          </button>
        ))
      }
    </div>
  );
}