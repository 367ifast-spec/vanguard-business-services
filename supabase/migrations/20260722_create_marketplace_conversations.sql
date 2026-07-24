CREATE TABLE marketplace_conversations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    buyer_id UUID NOT NULL REFERENCES auth.users(id),
    seller_id UUID NOT NULL REFERENCES auth.users(id),

    listing_id UUID
        REFERENCES marketplace_listings(id),

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_conversation_buyer
ON marketplace_conversations(buyer_id);

CREATE INDEX idx_conversation_seller
ON marketplace_conversations(seller_id);

CREATE INDEX idx_conversation_listing
ON marketplace_conversations(listing_id);