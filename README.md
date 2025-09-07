# Django Starter CLI

A CLI tool for quickly bootstrapping new Django projects preconfigured with **Tailwind CSS, DaisyUI, AlpineJS, HTMX, Django-partials, Django-cotton, and allauth**.  

This tool automates:  
- Cloning the Django starter template  
- Creating and activating a Python virtual environment  
- Installing Python + Node dependencies  
- Renaming the starter project folder and patching settings  
- Generating `.env` and `.gitignore`  

With a single command, you’ll have a ready-to-run Django project with Tailwind + DaisyUI integrated. 🚀  

---

## ✨ Features
- 🐍 Django 5.2.x preconfigured with:
  - Tailwind CSS 4 + DaisyUI  
  - AlpineJS + HTMX  
  - django-allauth, django-cotton, django-template-partials  
  - Stripe-ready integration scaffold  
- 🔑 Auto-generated `.env` file with secure Django secret key  
- 🛠️ Auto-generated `.gitignore` for Python, Django, and Node projects  
- ⚡ Node + Python dependency install baked in  
- 🔄 CLI + Bash wrapper to fully automate setup  

---

## 📦 Installation (via Homebrew)

First, tap the repo:

```bash
brew tap lostfiiles/django-tools
```

Then install:

```bash
brew install ds-create
```

This will install both `ds-create` and `cli.py` into your PATH.  

---

## 🚀 Usage

Create a new Django project with:

```bash
ds-create myproject
```

This will:  
1. Scaffold a new Django project in `myproject/`  
2. Create and activate a virtualenv (`env/`)  
3. Install Python + Node dependencies  
4. Rename the starter package (`django_starter` → `myproject`)  
5. Patch references in `settings.py`, `manage.py`, `wsgi.py`, `asgi.py`  
6. Generate `.env` and `.gitignore`  
7. Run `migrate`, `collectstatic`, and start the Django dev server  

Then open the browser at:  
👉 http://127.0.0.1:8000  

---

## 🧩 Example

```bash
ds-create ecom_store
```

Output:
```
✅ Created folder ecom_store
✅ Virtual environment created
✅ Python dependencies installed
✅ Node dependencies installed
✅ Renamed django_starter → ecom_store
✅ Updated project references
✅ Created .env
✅ Created .gitignore

🎉 Project bootstrap complete!
```

---

## ⚙️ Requirements
- macOS (tested) or Linux  
- Python 3.12+  
- Node.js 18+  
- Homebrew  

---

## 📄 License
MIT © [lostfiiles](https://github.com/lostfiiles)  
