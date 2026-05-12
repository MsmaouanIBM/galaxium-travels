from pydantic import BaseModel, EmailStr, Field, field_validator
from typing import Optional


class FlightOut(BaseModel):
    flight_id: int
    origin: str
    destination: str
    departure_time: str
    arrival_time: str
    price: int
    seats_available: int

    class Config:
        from_attributes = True


class BookingRequest(BaseModel):
    user_id: int
    name: str
    flight_id: int
    num_adults: int = Field(default=1, ge=1, description="Number of adult passengers (minimum 1)")
    num_infants: int = Field(default=0, ge=0, description="Number of infant passengers (under 2 years old)")
    
    @field_validator('num_infants')
    @classmethod
    def validate_infants(cls, v: int, info) -> int:
        """Validate that infants don't exceed 2 per adult"""
        num_adults = info.data.get('num_adults', 1)
        if v > num_adults * 2:
            raise ValueError(f"Number of infants ({v}) cannot exceed 2 per adult (max {num_adults * 2} for {num_adults} adults)")
        return v


class BookingOut(BaseModel):
    booking_id: int
    user_id: int
    flight_id: int
    status: str
    booking_time: str
    num_adults: int = 1
    num_infants: int = 0

    class Config:
        from_attributes = True


class UserRegistration(BaseModel):
    name: str
    email: EmailStr


class UserOut(BaseModel):
    user_id: int
    name: str
    email: str

    class Config:
        from_attributes = True


class ErrorResponse(BaseModel):
    success: bool = False
    error: str
    error_code: str
    details: Optional[str] = None
