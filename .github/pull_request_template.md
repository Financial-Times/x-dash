If this is your first `x-dash` pull request please familiarise yourself with the [contribution guide](https://github.com/Financial-Times/x-dash/blob/HEAD/contribution.md) before submitting.

## If you're creating a component:

- Add the `Component` label to this Pull Request
- If this will be a long-lived PR, consider using smaller PRs targeting this branch for individual features, so your team can review them without involving x-dash maintainers
  - If you're using this workflow, create a Label and a Project for your component and ensure all small PRs are attached to them. Add the Project to the [Components board](https://github.com/Financial-Times/x-dash/projects/4)
    - put a link to this Pull Request in the Project description
    - set the Project to `Automated kanban with reviews`, but remove the `To Do` column
  - If you're not using this workflow, add this Pull Request to the [Components board](https://github.com/Financial-Times/x-dash/projects/4).

## 

- Discuss features first
- Update the documentation
- **Must** be tested in FT.com and Apps before merge
- No hacks, experiments or temporary workarounds
- Reviewers are empowered to say no
- Reference other issues
- Update affected stories and snapshots
- Follow the code style
- Decide on a version (major, minor, or patch)
