import { createFileRoute } from "@tanstack/react-router";
import { VhaleApp } from "@/components/vhale/app";

export const Route = createFileRoute("/")({ component: VhaleApp });
