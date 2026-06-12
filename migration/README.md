# WordPress → Firebase RTDB migration

One-time migration of the legacy WordPress (MySQL) data into the
`baa-website-908e4` Realtime Database.

**Scope:** Records · Guides · Sponsors · Tournaments · Members
(member PII handled carefully — see "Members" below).

## Drop files here (both are gitignored — never committed)

| File | Where it goes | How to get it |
|------|---------------|---------------|
| WordPress DB dump | `migration/_input/baa.sql` (or `.sql.gz`) | see "Exporting the dump" |
| Firebase service-account key | `migration/_input/serviceAccountKey.json` | Firebase Console → Project Settings → Service Accounts → **Generate new private key** |

## Exporting the dump (from the WordPress host)

**Option A — cPanel / phpMyAdmin (most common):**
1. Log into the host's cPanel → **phpMyAdmin**.
2. Select the WordPress database (left sidebar — usually the one with `wp_` tables).
3. Top tab **Export** → Method **Custom** → Format **SQL**.
4. Under "Output", tick **gzip** (smaller). Leave everything else default — we want **all tables, structure + data**.
5. **Go** → save the `.sql.gz`. Drop it in `migration/_input/`.

**Option B — SSH / WP-CLI (if available):**
```bash
wp db export baa.sql        # or:
mysqldump -u USER -p DBNAME > baa.sql
```

> A full dump is fine — I only read the tables we need and ignore the rest.
> Nothing is sent anywhere; parsing happens entirely on this machine.

## What I do with it

1. Load the dump into a local throwaway DB (or parse directly) and **inspect the real schema** — which plugin owns Records, how guide/sponsor meta is keyed, etc.
2. Map each WordPress entity → clean JSON matching the RTDB shape.
3. Dry-run: write JSON to `migration/output/*.json` for you to eyeball **before** anything touches RTDB.
4. On your OK, push with `firebase-admin` to RTDB.

## Members — handled deliberately

- We do **not** mirror `wp_users` password hashes or any WooCommerce payment data into RTDB.
- Member *profiles* (name, email, membership tier, expiry) can go to RTDB and/or be imported into **Firebase Auth**; passwords get reset via Firebase's email flow rather than migrated.
- RTDB **security rules are locked down** before any member data is uploaded.

## Safety

- Raw dump, extracted DB, and the service-account key are all gitignored.
- RTDB writes are reversible — we snapshot/export the current RTDB first, and migrate into a namespaced path we can wipe and re-run.
