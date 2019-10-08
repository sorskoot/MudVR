# Dungeon

Although hopefully the rooms in the game don't look like real dungeons, we should approach them as such. That way we can generate an endless dungeon of connected rooms based on specific rules.

## Dungeon Generation Rules

Rules:

- Each room has at least 1 exit
- A room with 1 exit is a dead end
- Change of North, South, East, West exits are equal.
- Change of up or down exit is much lower.

## Possible issues to overcome

- The dungeon MUST be endless. It should not be possible to create a closed loop.

' -1  0   1   2
 --- --- --- ---
|   |   |   |   |  -1
 --- --- --- ---
|   | 0 |   |   |   0
 --- --- --- ---
|   |   |   |   |   1
 --- --- --- ---

## Key rooms

Key rooms are rooms that are on a grid around the world with 32 rooms in between in 4 directions. The path between key rooms is generated, but there's ALWAYS a valid path from key room to key room. This will garantee an endless world with paths to everywhere.

We could use the same principle to generate quests. We could even have the distance between the different parts of a quest far greater than the distance between key rooms as long there's a path from a key room to a quest part.

- Create random paths between key rooms around the player
