ExUnit.start

Mix.Task.run "ecto.create", ~w(-r WebpackIntegration.Repo --quiet)
Mix.Task.run "ecto.migrate", ~w(-r WebpackIntegration.Repo --quiet)
Ecto.Adapters.SQL.begin_test_transaction(WebpackIntegration.Repo)

