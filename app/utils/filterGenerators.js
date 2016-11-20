
export function generatePlayerSearchFilter(username) {
  const filter = {
    limit: 1,
    where: {
      username,
    },
    include: {
      relation: 'drinks',
      scope: {
        order: 'date DESC',
        fields: ['amount', 'date', 'id', 'brandId'],
        include: {
          relation: 'brand',
          scope: {
            fields: ['name', 'id'],
          },
        },
      },
    },
  };

  return JSON.stringify(filter);
}

export function generateBrandSearchFilter(name) {
  const filter = {
    limit: 1,
    where: {
      name,
    },
    include: {
      relation: 'drinks',
      scope: {
        order: 'date DESC',
        fields: ['amount', 'date', 'id', 'playerId'],
        include: {
          relation: 'player',
          scope: {
            fields: ['username', 'id'],
          },
        },
      },
    },
  };

  return JSON.stringify(filter);
}
