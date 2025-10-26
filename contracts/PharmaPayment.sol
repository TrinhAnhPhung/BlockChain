// contracts/PharmaPayment.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract PharmaPayment {
    address public owner;
    uint256 public totalTransactions;
    
    struct Transaction {
        address buyer;
        uint256 amount;
        string productIds;
        uint256 timestamp;
        bool completed;
    }
    
    mapping(uint256 => Transaction) public transactions;
    
    event PaymentReceived(
        uint256 indexed transactionId,
        address indexed buyer,
        uint256 amount,
        string productIds
    );
    
    event PaymentCompleted(
        uint256 indexed transactionId,
        address indexed buyer,
        uint256 amount
    );
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }
    
    constructor() {
        owner = msg.sender;
    }
    
    function makePayment(string memory _productIds) external payable {
        require(msg.value > 0, "Payment amount must be greater than 0");
        
        totalTransactions++;
        
        transactions[totalTransactions] = Transaction({
            buyer: msg.sender,
            amount: msg.value,
            productIds: _productIds,
            timestamp: block.timestamp,
            completed: false
        });
        
        emit PaymentReceived(totalTransactions, msg.sender, msg.value, _productIds);
    }
    
    function completePayment(uint256 _transactionId) external onlyOwner {
        require(_transactionId <= totalTransactions, "Transaction does not exist");
        require(!transactions[_transactionId].completed, "Transaction already completed");
        
        transactions[_transactionId].completed = true;
        
        emit PaymentCompleted(
            _transactionId,
            transactions[_transactionId].buyer,
            transactions[_transactionId].amount
        );
    }
    
    function getTransaction(uint256 _transactionId) external view returns (
        address buyer,
        uint256 amount,
        string memory productIds,
        uint256 timestamp,
        bool completed
    ) {
        require(_transactionId <= totalTransactions, "Transaction does not exist");
        
        Transaction memory tx = transactions[_transactionId];
        return (tx.buyer, tx.amount, tx.productIds, tx.timestamp, tx.completed);
    }
    
    function withdraw() external onlyOwner {
        payable(owner).transfer(address(this).balance);
    }
    
    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }
}
