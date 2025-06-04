import { useLocation, useParams, useNavigate } from "react-router-dom";
import React from "react";

export interface RouterProps {
  location: ReturnType<typeof useLocation>;
  navigate: ReturnType<typeof useNavigate>;
  params: ReturnType<typeof useParams>;
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