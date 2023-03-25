function getCombatAction(weaponType: string) {
  const action = {
    name: "COMBAT_ATTACK",
    animated: true,
  };
  if (
    weaponType === "SPEAR" ||
    weaponType === "BOW" ||
    weaponType === "KNUCKLE" ||
    weaponType === "ROD" ||
    weaponType === "BOOK"
  ) {
    return {
      ...action,
      actionsList: [88, 89, 90, 91, 92, 93, 94, 95],
    };
  }
  return {
    ...action,
    actionsList: [80, 81, 82, 83, 84, 85, 86, 87],
  };
}

const Actions = [
  {
    name: "IDLE",
    actionsList: [0, 1, 2, 3, 4, 5, 6, 7],
    animated: false,
  },
  {
    name: "WALK",
    actionsList: [8, 9, 10, 11, 12, 13, 14, 15],
    animated: true,
  },
  {
    name: "SIT",
    actionsList: [16, 17, 18, 19, 20, 21, 22, 23],
    animated: false,
  },
  {
    name: "PICKUP",
    actionsList: [24, 25, 26, 27, 28, 29, 30, 31],
    animated: true,
  },
  {
    name: "COMBAT_IDLE",
    actionsList: [32, 33, 34, 35, 36, 37, 38, 39],
    animated: true,
  },
  {
    name: "COMBAT_HIT",
    actionsList: [48, 49, 50, 51, 52, 53, 54, 55],
    animated: true,
  },
  {
    name: "COMBAT_FALL",
    actionsList: [56, 57, 58, 59, 60, 61, 62, 63],
    animated: false,
  },
  {
    name: "COMBAT_DEATH",
    actionsList: [64, 65, 66, 67, 68, 69, 70, 71],
    animated: false,
  },
  {
    name: "CAST",
    actionsList: [96, 97, 98, 99, 100, 101, 102, 103],
    animated: true,
  },
];

export function getActions(weaponType: string) {
  return Actions.concat(getCombatAction(weaponType));
}
