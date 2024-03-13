pragma solidity ^0.8;

contract RealEstateContract {
   struct Property {
        uint256 propId;
        address owner;
        uint256 price;
        string propTitle;
        string category;
        string images;
        string propAddr;      
    }

    struct Product {
        uint256 prodId;
        uint256 totalRating;
        uint256 numOfReviews;
    }

    struct Review {
        address reviewer;
        uint256 prodId;
        uint256 rating;
        string comment;
        uint256 likes;
    }
    // Mapping
    mapping(uint256 => Property) public properties;

    //events
    event PropertyListed(address owner, uint256 propId, uint256 price);
    event PropertyPurchased(address owner, uint256 propId, uint256 price);

    // variables
    uint256 public propertyCount;

    function listProperty (
        address _owner,
        uint256 _price,
        string memory _propTitle,
        string memory _category,
        string memory _images,
        string memory _propAddr     
    ) external returns(uint256) {
        
        require(_price > 0, "Price should be greater than 0");
        
        uint256 propId = propertyCount+1;
        Property storage property = properties[propId];
        property.propId = propId;
        property.owner = _owner;
        property.price = _price;
        property.propTitle =_propTitle;
        property.category = _category;
        property.images = _images;
        property.propAddr = _propAddr;
        propertyCount++;
        emit PropertyListed(property.owner, property.propId, property.price);
        return property.propId;
    }

     function updateProperty (
        uint256 _propId,
        string memory _propTitle,
        string memory _category,
        string memory _images,
        string memory _propAddr     
    ) external returns(uint256) {

        Property storage property = properties[_propId];
        require(property.owner == msg.sender, "Only owner can update");
        property.propTitle =_propTitle;
        property.category = _category;
        property.images = _images;
        property.propAddr = _propAddr;
        return property.propId;
    }

    function updatePrice (
        uint256 _propId,
        uint256 _price 
    ) external returns(string memory) {
        Property storage property = properties[_propId];
        require(property.owner == msg.sender, "Only owner can update");
        require(_price > 0, "Price should be greater than 0");
        property.price = _price;
        return "Price updated successfully";
    }

    function buyProperty (
        uint256 _propId,
        address _buyer
    ) external payable returns(string memory) {
        Property storage property = properties[_propId];
        require(msg.value >= property.price, "no sufficient amount");
        (bool sent,) = payable(property.owner).call{value:msg.value}("");
        if(sent) {
            property.owner = _buyer;
            emit PropertyPurchased(property.owner, _propId, msg.value);
        }
        return "Property Bought";
    }

    function getProperty (
        uint256 _propId
    ) external view returns(Property memory) {
        Property storage property = properties[_propId];
        return property;
    }

    function getAllProperties () external view returns(Property[] memory) {
        uint256 retArrSize = propertyCount;
        Property[] memory retArr = new Property[](retArrSize);
        for(uint i=0; i<retArrSize; i++) {
            Property storage prop = properties[i+1];
            retArr[i] = prop;
        }
        return retArr;
    }

    function getUserProperties(address _user) external view returns(Property[] memory) {
        uint256 propLength = propertyCount;
        uint256 retArrSize;
    
        for(uint i=0; i<propLength; i++) {
            Property storage prop = properties[i+1];
            if(prop.owner == _user) {
                retArrSize += 1;
            }
        }

        Property[] memory retArr = new Property[](retArrSize);
        uint256 curIndex;

        for(uint i=0; i< propLength; i++) {
            Property storage prop = properties[i+1];
            if(prop.owner == _user) {      
                retArr[curIndex] = prop;
                curIndex += 1;         
            }
        }
        return retArr;
    }
}