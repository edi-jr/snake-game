const game = {
  hasStarted: false,
  isOver: false,
  snake: {
    x: 4,
    y: 1,
    speedX: 0,
    speedY: 0,
    trail: [
      { x: 1, y: 1 },
      { x: 2, y: 1 },
      { x: 3, y: 1 },
      { x: 4 , y: 1 },
    ],
    tailLength: 4,
    lastDirection: undefined,
  },
  apple: {
    x: undefined,
    y: undefined,
  },
  spaces: {
    lenght: 20,
    totalInXAxis: stage.width / 20,
    totalInYAxis: stage.height / 20,
  },
  walls: {
    left: 0,
    top: 0,
    right: stage.width / 20 - 1,
    bottom: stage.height / 20 - 1
  },
};