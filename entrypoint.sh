#!/bin/sh
set -e

# Define directories
VOLUME_STATIC_DIR="/app/.next/static"
VOLUME_PUBLIC_DIR="/app/public"
IMAGE_STATIC_DIR="/app/.next/static.tmp"
IMAGE_PUBLIC_DIR="/app/public.tmp"

# Function to perform a deep merge, with image files overriding conflicts
deep_merge() {
    local src="$1"
    local dest="$2"
    
    if [ ! -d "$src" ]; then
        echo "Source directory $src does not exist, skipping"
        return
    fi

    echo "Performing deep merge from $src to $dest"
    
    # Create destination directory if it doesn't exist
    mkdir -p "$dest"

    # Iterate over all items in the source directory
    for item in "$src"/*; do
        local base_item=$(basename "$item")
        local dest_item="$dest/$base_item"

        if [ -d "$item" ]; then
            # If it's a directory, recursively merge
            deep_merge "$item" "$dest_item"
        elif [ -f "$item" ]; then
            # If it's a file, copy (overwrite if exists)
            cp -f "$item" "$dest_item"
            echo "Copied: $item -> $dest_item"
        fi
    done
}

# Ensure volume directories exist
mkdir -p "$VOLUME_STATIC_DIR" "$VOLUME_PUBLIC_DIR"

# Deep merge static files from the image to the volume
deep_merge "$IMAGE_STATIC_DIR" "$VOLUME_STATIC_DIR"

# Deep merge public files from the image to the volume
deep_merge "$IMAGE_PUBLIC_DIR" "$VOLUME_PUBLIC_DIR"

# Start the Next.js application
exec "$@"