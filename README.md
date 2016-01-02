# Webpack Integration

Replace the default brunch based asset pipeline with webpack. The webpack based
pipeline works very similar to the brunch based approach. All assets reside
in `web/static` and will be compiled and moved to `priv/static`.

Phoenix is configured to start webpack with the `--watch` option automatically
on `mix phoenix.server`.

Additionally, the mix task `mix phoenix.digest` compiles the assets depending
on MIX_ENV. For example

```
MIX_ENV=prod mix phoenix.digest
```

There's is not HMR (Hot Module Replacement) configured currently, since I first
wanted to replicate the behaviour of brunch.

Most important file changes can be found in:
* package.json
* webpack.config.js
* config/dev.exs (file watcher for webpack)
* lib/mix/tasks/digest.ex (webpack build mix task)
* mix.exs (alias "mix phoenix.digest" to above task)

To start your Phoenix app:

  1. Install dependencies with `mix deps.get`
  2. Create and migrate your database with `mix ecto.create && mix ecto.migrate`
  3. Start Phoenix endpoint with `mix phoenix.server`

Now you can visit [`localhost:4000`](http://localhost:4000) from your browser.

Ready to run in production? Please [check our deployment guides](http://www.phoenixframework.org/docs/deployment).

## Learn more

  * Official website: http://www.phoenixframework.org/
  * Guides: http://phoenixframework.org/docs/overview
  * Docs: http://hexdocs.pm/phoenix
  * Mailing list: http://groups.google.com/group/phoenix-talk
  * Source: https://github.com/phoenixframework/phoenix
