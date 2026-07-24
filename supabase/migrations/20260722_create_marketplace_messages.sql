CREATE TABLE marketplace_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    conversation_id UUID NOT NULL
        REFERENCES marketplace_conversations(id)
        ON DELETE CASCADE,

    sender_id UUID NOT NULL
        REFERENCES auth.users(id),

    message TEXT NOT NULL,

    is_read BOOLEAN NOT NULL DEFAULT FALSE,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_marketplace_messages_conversation
ON marketplace_messages(conversation_id);

CREATE INDEX idx_marketplace_messages_sender
ON marketplace_messages(sender_id);

CREATE INDEX idx_marketplace_messages_created
ON marketplace_messages(created_at);