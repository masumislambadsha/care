"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { initializeTheme } from "@/store/slices/themeSlice";

export function ThemeInitializer() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeTheme());
  }, [dispatch]);

  return null;
}
