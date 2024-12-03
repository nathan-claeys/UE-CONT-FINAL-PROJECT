CREATE TABLE matches (
                         id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                         creator_id UUID NOT NULL,
                         opponent_id UUID,
                         status VARCHAR(20) CHECK (status IN ('created', 'in-progress', 'finished', 'canceled')) DEFAULT 'created',
                         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                         updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE rounds (
                        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                        match_id UUID REFERENCES matches(id) ON DELETE CASCADE,
                        round_number INT NOT NULL,
                        player1_choice VARCHAR(255) NOT NULL,  -- Pokéchakuchon ID
                        player2_choice VARCHAR(255) NOT NULL,  -- Pokéchakuchon ID
                        winner_id UUID,  -- ID of the winning player (optional initially)
                        result VARCHAR(20) CHECK (result IN ('player1_win', 'player2_win', 'draw')),  -- Optional if not yet resolved
                        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE match_statistics (
                                  user_id UUID PRIMARY KEY,  -- User ID (this can also be NULL if querying global stats)
                                  total_matches INT DEFAULT 0,
                                  wins INT DEFAULT 0,
                                  losses INT DEFAULT 0,
                                  draws INT DEFAULT 0
);

CREATE TABLE match_history (
                               user_id UUID PRIMARY KEY,  -- User ID
                               matches JSONB  -- Store matches data as a JSON array or structure
);
