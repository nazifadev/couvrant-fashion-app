from fastapi import FastAPI
from fastapi import Depends
from database import SessionLocal
from models import Item
from schemas import ItemCreate
from schemas import ItemResponse
from schemas import ItemsResponse
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv
from sqlalchemy import or_
from models import Item, ClothingCategory

load_dotenv()

app = FastAPI()

origins = [
    os.getenv("FRONTEND_URL")
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def get_root():
    return {"message": "FastAPI is connected."}


def get_db():
    db = SessionLocal()  
    try:
        yield db          
    finally:
        db.close()      


@app.get("/items", response_model = ItemsResponse)
def get_items(db = Depends(get_db), limit: int = 9, page: int = 1, search: str = "", brand:str= "", 
              color:str ="", category_id: int | None = None, min_price: float | None = None, max_price: float | None = None ):
    skip = (page - 1) * limit
    query = db.query(Item)

    if search:
        query = query.filter(or_(
            Item.name.ilike(f"%{search}%"),
            Item.brand_name.ilike(f"%{search}%")
            ))


#seperate if blocks for filters because frontend will display exactly what user wants to filter by, we won't have to guess like we did for search box
    if brand:
        query = query.filter(
            Item.brand_name == brand
            )

    if color:
        query = query.filter(
            Item.color == color
            )

    if category_id != None:
        query = query.filter(
            Item.category_id == category_id
            )

    if min_price != None:
        query = query.filter(
            Item.price >= min_price
            )
        
    if max_price != None:
        query = query.filter(
            Item.price <= max_price
            )




        
    items = query.limit(limit).offset(skip).all()
    return { "items": items, "total": query.count()}
    
    
    

    
@app.post("/items", response_model=ItemResponse)
def post_items(item: ItemCreate, db = Depends(get_db)):
     new_item = Item(**item.model_dump())
     db.add(new_item)
     db.commit()
     db.refresh(new_item)
     return new_item


@app.get("/items/{id}")
def get_item(id: int, db=Depends(get_db)):
    item = db.query(Item).filter(Item.id == id).first()
    return item

@app.get("/brands")
def get_brands(db = Depends(get_db)):
    brands = db.query(Item.brand_name).distinct().all()
    return [b[0] for b in brands]

@app.get("/categories")
def get_categories(db = Depends(get_db)):
    categories = db.query(ClothingCategory).all()
    return categories

@app.get("/colors")
def get_colors(db = Depends(get_db)):
    colors = db.query(Item.color).distinct().all()
    return [c[0] for c in colors]