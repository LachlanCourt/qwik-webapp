import {
  RouteLocation,
  useLocation as useQwikLocation,
} from "@builder.io/qwik-city";

interface Location extends RouteLocation {
  formPostUrl: string;
}

export const useLocation = (): Location => {
  const location = useQwikLocation();
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
  const formPostUrl = `${protocol}://${location.url.host}`;
  return { ...location, formPostUrl };
};
