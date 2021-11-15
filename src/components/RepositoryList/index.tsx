import { useState, useEffect } from "react";
import { RepositoryItem } from "../RepositoryItem";
import "../../styles/repositories.scss";

const BASE_URL = "https://api.github.com/orgs/rocketseat/repos";

interface Repository  {
  name: string;
  description: string;
  html_url: string;
}

export function RepositoryList() {
  const [repositories, setRepositories] = useState<Repository[]>([]);

  useEffect(function () {
    fetch(BASE_URL)
      .then((response) => response.json())
      .then((data) => setRepositories(data));
  }, []);

  return (
    <section className="repository-list">
      <h1>Lista de Repositorios</h1>

      <ul>
        {repositories.map((repo) => {
          return <RepositoryItem key={repo.name} repository={repo} />;
        })}
      </ul>
    </section>
  );
}
