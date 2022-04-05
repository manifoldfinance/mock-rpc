{ system ? builtins.currentSystem
, nixpkgs ? import ./nixpkgs.nix { inherit system; }
}:
let
  sources = import ./sources.nix;

  devshell = import sources.devshell { inherit nixpkgs; };
in
{
  inherit nixpkgs;

  # Docs: https://numtide.github.io/devshell/modules_schema.html
  env = devshell.mkShell {
    env = [
      # Configure nix to use nixpgks
      { name = "NIX_PATH"; value = "nixpkgs=${toString nixpkgs.path}"; }
    ];

    packages = [
      # Development tools
      nixpkgs.hadolint
      nixpkgs.jq
      nixpkgs.just
      nixpkgs.niv
      nixpkgs.shellcheck
      nixpkgs.websocat
      nixpkgs.httpie
      nixpkgs.yq

      # DevOps tools

      # Code formatting
      nixpkgs.treefmt
      nixpkgs.nixpkgs-fmt
      nixpkgs.shfmt
      nixpkgs.nodePackages.prettier

      # Used by js modules
      nixpkgs.nodejs-16_x
    ];

    commands = [ ];
  };
}
