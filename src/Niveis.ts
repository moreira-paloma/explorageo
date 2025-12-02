export type Nivel = {
  nome: string;
  emoji: string;
  minimo: number;
};

export const niveis: Nivel[] = [
  { nome: 'Iniciante', emoji: '🐣', minimo: 0 },
  { nome: 'Aventureiro', emoji: '🧭', minimo: 15 },
  { nome: 'Mestre Geografia', emoji: '🌍👑', minimo: 30 },
];

export function calcularNivel(pontos: number): Nivel {
  return [...niveis].reverse().find((n) => pontos >= n.minimo)!;
}