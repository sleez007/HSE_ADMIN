# HSE Admin end Repository

Hi! welcome to the **HSE** admin end. This repository contains code for the admin end project built with Angular JS. This readme file serves as a guide to enable project collaborators to know how to set up projects and also get a detailed overview of project architectures and libs used.

## Pulling project into an already existing folder with files

If you already have generated a project before synchronizing this repository, then you may want to fetch this repository using git rather than cloning. Find the steps below:

- Remove the existing **.git** folder by running the command ``rm -fr .git`` . This is only necessary if you already have initialized git in the current directory.
- Initialize git again by running the command ``git init`` in the project directory.
- Add the remote origin by running the command ``git remote add origin https://github.com/sleez007/HSE_ADMIN.git``
- Sync with the existing online repository by running the command ``git fetch origin`` to pull down the remote repository.
- Check out the specific branch you want with the command i.e ``git checkout -b branch-name`` where **branch-name** is a placeholder for the specific branch you would want to checkout.
- At this point, You are good to go 😁

## Cloning the project for the first time

If you intend to clone the project freshly to your system then, a simple git clone will suffice i.e ``git clone hhttps://github.com/sleez007/HSE_ADMIN.git``. The example above assumes you are using HTTPS and not SSH.

## Important Note

Whatever you do, **Make sure** to keep off pushing directly to the production branch as it should be a read-only branch for contributors. You are allowed to use feature branches. After pushing a certain feature branch, you can go ahead and open a pull request on the ``main branch``  as we won't be using this as the master branch

## Project dependency

Please ensure you add all your project dependencies here in the section, for easy tracking

- ngx progressbar
- NgRx Store
- NgRx Effect
- NgRx Router store
- NgRx Entity
- NgRx dev tool
- PrimeNg

## Feel free to add screenshots

You can go ahead and attach your app screenshots if you wish

## Live deployment Url

[Live deployment URL](https://hse-admin-two.vercel.app/)
