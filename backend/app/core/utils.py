from sqlalchemy.orm import Session
from typing import List, Type, Any

def sync_tags(
    db: Session,
    model: Type[Any],
    fk_field: str,
    fk_value: int,
    new_tags: List[str]
):
    """
    Syncs tags for a given model (e.g., ExperienceTag, AccountTag) using a diff-and-reuse strategy.
    Keeps existing tags, adds new ones, and deletes removed ones.
    """
    # Fetch existing tags
    existing_tags = db.query(model).filter(getattr(model, fk_field) == fk_value).all()
    existing_tag_map = {t.tag: t for t in existing_tags}
    
    # Identify tags to keep, insert, delete
    new_tag_set = set(new_tags) if new_tags else set()
    
    # Delete removed tags
    for tag_str, tag_obj in existing_tag_map.items():
        if tag_str not in new_tag_set:
            db.delete(tag_obj)
            
    # Insert new tags
    for tag_str in new_tag_set:
        if tag_str not in existing_tag_map:
            new_tag = model(tag=tag_str, **{fk_field: fk_value})
            db.add(new_tag)
