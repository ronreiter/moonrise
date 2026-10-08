import sessionTypes from "@/content/session-types.json";
import type { SessionIconName } from "@/content/site";

export type SessionType = {
  id: string;
  number: string;
  name: string;
  meta: string;
  icon: SessionIconName;
  description: string;
};

export const sessionTypeList: SessionType[] = sessionTypes as SessionType[];

export function getSessionType(id: string): SessionType | undefined {
  return sessionTypeList.find((type) => type.id === id);
}
