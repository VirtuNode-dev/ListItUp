# S3-Compatible Attachment Storage

ListItUp will store Item Attachments in private S3-compatible object storage, initially backed by the existing MinIO instance. Attachments can be large project-support files, so object storage is preferred over database blobs or local disk; the app remains responsible for Workspace-aware access control and issuing upload/download access.

## Status

accepted

## Consequences

- Attachment upload flows should support large files without routing file bytes through normal form posts.
- Attachment access must be mediated by Workspace and Item permissions.
- The storage integration should stay S3-compatible so MinIO can be replaced by another S3-compatible backend if needed.
