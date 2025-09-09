{pkgs ? import <nixpkgs> {}}:
pkgs.mkShell {
  buildInputs = with pkgs; [
    nodejs
    pnpm
  ];

  NIX_SHELL_PRESERVE_PROMPT = 1;
}
