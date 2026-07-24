CREATE TABLE escrow_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    escrow_id UUID NOT NULL
        REFERENCES escrow_transactions(id)
        ON DELETE CASCADE,

    sender_id UUID NOT NULL
        REFERENCES auth.users(id),

    message TEXT NOT NULL,

    is_admin BOOLEAN NOT NULL DEFAULT FALSE,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_escrow_messages_escrow_id
ON escrow_messages(escrow_id);

CREATE INDEX idx_escrow_messages_sender_id
ON escrow_messages(sender_id);