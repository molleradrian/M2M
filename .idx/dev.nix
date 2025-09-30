{pkgs}: {
  channel = "stable-24.05";
  packages = [
    pkgs.nodejs_22
  ];
  idx.extensions = [
    "angular.ng-template"
  ];
  idx.previews = {
    previews = {
      web = {
        command = [
          "npx",
          "ng",
          "serve",
          "--port",
          "$PORT",
          "--host",
          "0.0.0.0"
        ];
        manager = "web";
      };
    };
  };
}