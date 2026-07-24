CREATE TABLE ratings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    seller_id UUID NOT NULL
        REFERENCES auth.users(id),

    buyer_id UUID NOT NULL
        REFERENCES auth.users(id),

    escrow_id UUID NOT NULL
        REFERENCES escrow_transactions(id),

    rating INTEGER NOT NULL
        CHECK (rating >= 1 AND rating <= 5),

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    UNIQUE (buyer_id, escrow_id)
);

CREATE INDEX idx_ratings_seller_id
ON ratings(seller_id);

CREATE INDEX idx_ratings_buyer_id
ON ratings(buyer_id);

CREATE INDEX idx_ratings_escrow_id
ON ratings(escrow_id);