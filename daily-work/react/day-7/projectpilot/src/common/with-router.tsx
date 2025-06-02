import { useLocation, useNavigate, useParams } from "react-router-dom";
import React from "react";
import type { Location, NavigateFunction } from "react-router-dom";

export interface RouterProps {
  location: Location;
  navigate: NavigateFunction;
  params: Record<string, string | undefined>;
}

export const withRouter = <P extends object>(
  Component: React.ComponentType<P & { router: RouterProps }>
) => {
  function ComponentWithRouterProp(props: P) {
    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams();

    return <Component {...props} router={{ location, navigate, params }} />;
  }

  return ComponentWithRouterProp;
};
