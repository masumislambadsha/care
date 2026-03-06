"use client";

import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export default function TestThemePage() {
  const theme = useSelector((state: RootState) => state.theme.theme);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 p-8 transition-colors">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Theme Test Page
          </h1>
          <ThemeToggle />
        </div>

        <div className="bg-slate-100 dark:bg-slate-900 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
            Current Theme Info
          </h2>
          <div className="space-y-2 text-slate-700 dark:text-slate-300">
            <p>
              Current Theme: <strong>{theme}</strong>
            </p>
            <p>
              HTML has dark class:{" "}
              <strong>
                {typeof window !== "undefined"
                  ? String(document.documentElement.classList.contains("dark"))
                  : "N/A"}
              </strong>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg border border-slate-200 dark:border-slate-700">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
              Card 1
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              This card should change colors when you toggle the theme.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg border border-slate-200 dark:border-slate-700">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
              Card 2
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Dark mode should apply to all elements.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <button className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg">
            Primary Button
          </button>
          <button className="px-4 py-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-900 dark:text-white rounded-lg ml-4">
            Secondary Button
          </button>
        </div>

        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 p-4 rounded-lg">
          <p className="text-amber-900 dark:text-amber-200">
            ✅ If you can see this message change colors, dark mode is working!
          </p>
        </div>

        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 p-4 rounded-lg">
          <h3 className="font-semibold text-green-900 dark:text-green-200 mb-2">
            Instructions:
          </h3>
          <ol className="list-decimal list-inside space-y-1 text-green-800 dark:text-green-300">
            <li>Click the theme toggle button above</li>
            <li>Watch the background change from white to dark</li>
            <li>Watch the cards change from white to slate-800</li>
            <li>Watch text colors invert</li>
            <li>Reload the page - theme should persist</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
