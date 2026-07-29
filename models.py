from sqlalchemy.orm import Mapped, mapped_column, relationship
from database import Base
from typing import Optional, List
from datetime import datetime
from sqlalchemy import ForeignKey, func


class ClothingCategory(Base):
    __tablename__ = "clothing_categories"
    id : Mapped[int] = mapped_column(primary_key=True)    
    name : Mapped[str]


class DesignTag(Base):
    __tablename__ = "design_tags"
    id : Mapped[int] = mapped_column(primary_key=True)    
    name : Mapped[str]


class ItemSize(Base):
    __tablename__ = "item_sizes"
    item_id : Mapped[int]  = mapped_column(ForeignKey("items.id"),primary_key=True)    
    size_id : Mapped[int]=  mapped_column(ForeignKey("sizes.id"),primary_key=True)    


class ItemTag(Base):
    __tablename__ = "item_tags"
    item_id : Mapped[int] =  mapped_column(ForeignKey("items.id"),primary_key=True)    
    tag_id : Mapped[int] =  mapped_column(ForeignKey("design_tags.id"), primary_key=True)    

class Size(Base):
    __tablename__ = "sizes"
    id : Mapped[int] = mapped_column(primary_key=True)    
    size : Mapped[str]

class Image(Base):
    __tablename__ = "images"
    id : Mapped[int] = mapped_column(primary_key=True)    
    image_url : Mapped[str]
    item_id : Mapped[int] = mapped_column(ForeignKey("items.id"))
    image_type : Mapped[Optional[str]]
    is_display_image : Mapped[bool]
    display_order: Mapped[Optional[int]]

class Item(Base):
    __tablename__ = "items"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str]
    description: Mapped[Optional[str]]
    price: Mapped[float]
    currency: Mapped[str]
    brand_name: Mapped[str]
    product_url: Mapped[str]
    color: Mapped[str]
    category_id: Mapped[int] = mapped_column(ForeignKey("clothing_categories.id"))    
    in_stock: Mapped[bool]
    source: Mapped[str]
    external_id: Mapped[str]
    created_at: Mapped[Optional[datetime]] = mapped_column(server_default=func.now())
    updated_at: Mapped[Optional[datetime]] = mapped_column(server_default=func.now())
    item_images: Mapped[List[Image]] = relationship(Image)
    is_featured: Mapped[bool] = mapped_column(default=False)
    




