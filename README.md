# Bit54 - Better than Sendwave

**Bit54** is an international money transfer platform that makes it easy to send money to all 54 African countries—powered by **TBDEX protocol**.

![Bit54 - Send money to 54 countries in Africa](https://ik.imagekit.io/monierate/bit54-readme-banner.png?updatedAt=1726419790322)

Africa remains one of the most expensive regions for sending money, with an average transaction cost of **7.8%** per $200 sent. Remittances to Africa reached **$100 billion** in 2022, yet inefficiencies and high costs continue to plague people, particularly for intra-Africa transfers. With 54 countries, thousands of payment corridors, and varying regulations, traditional cross-border payments are costly and slow, with limited transparency.

### Bit54: Money transfer, reinvented

Bit54 utilizes two core technologies: **TBDEX protocol** and ***Lightning Network***.

- **TBDEX**: For settlement across African countries, Bit54 leverages the **TBDEX decentralized exchange protocol**, which allows us to convert Bitcoin into local currencies through a network of **Decentralized Participants (PFIs)**. This eliminates our users reliance on costly, centralized exchanges and streamlines cross-border transactions.

- **Lightning Network**: As an **intermediary**, we accept payment from the user and settle with a PFI via Bitcoin Lightning Network. Users can pay with Bitcoin, which we use to accept payments and settle with the PFIs. This allows users to avoid traditional bank fees and ensures they have full control over their funds.

*This unique combination makes Bit54 faster, cheaper, and more flexible than traditional apps like Sendwave.*

### How it works

1. **Decentralized PFI Selection**  
   Bit54 automatically selects the best PFI based on criteria such as exchange rates, customer ratings, KYC requirements, and settlement speed.

   ```ts
   const offerings = await getRelevantOfferings({ 
     sendCurrency: "USD",
     receiveCurrency: "KES",
   });
   const winnerOffering = bestOffering(offerings);
   ```

   This algorithm ensures users get the best deal, with transparency in the selection process. Other platforms typically rely on a fixed partner for settlements, limiting flexibility.

2. **Decentralized Identifiers (DIDs) and Verifiable Credentials (VCs)**  
   Bit54 stores and manages users' **DIDs** and **VCs**, ensuring secure identity management without sacrificing convenience. DIDs identify users, while VCs (such as KYC credentials) are issued by trusted institutions.

   ```ts
   const userDID = await storeDID(user);
   const verifiedCredential = await issueVC(userDID, KYCData);
   ```

   This decentralization ensures privacy while adhering to regulatory requirements.

3. **Send for only $1**  
   Bit54 charges a flat **$1 fee** per transaction, making it one of the cheapest options for sending money to Africa. As an **intermediary**, we accept payment from the user and **create exchange** with the PFI on behalf of the user. This model enables banks and fintechs to **embed** Bit54 into their apps and add a small markup if needed.

```ts
   // verify transfer and create exchange
  async function verifyUserPaymentAndCreateExchange() {
    const transfers = await Transfer.find({
      where: {
        status: TransferStatus.Onhold, // payment accepted
      },
    });
  
    const promises = transfers.map(async (transfer) => {
      const { 
        offeringAmount,
        netAmount, // user amount after $1 is deducted
        sourceCurrency,
        destinationCurrency, 
      } = transfer;
  
      // create exchange 
      const exchange = await Exchange.create({
        offeringAmount,
        netAmount,
        sourceCurrency,
        destinationCurrency,
      });
    
      await transfer.update({
        status: TransferStatus.Processing,
        exchangeId: exchange.id,
      });
  
      return exchange;
    });
  }
   ```

---

### Bank and Fintech Integration

Bit54 offers both **widget and api** that allows banks and fintechs to embed our service seamlessly. Our integration model enables partners to offer cross-border payments within their existing platforms, without needing to build the infrastructure from scratch.

#### Example API Call for Embedded Widget

```ts
// Example of initiating a money transfer
const widget = new Bit54Widget()

widget.transfer({
  key: 'bt_54_domain_xxxxxx',
  email: 'user@email.com',
  redirect: false,
  onLoad: (response) => {
    console.log("onLoad: ", response);
  },
  onCompleted: (response) => {
    console.log("Completed", response);
  },
  onCancel: () => {
    console.log("onCancel");
  },
  onError: (error) => {
    console.log("Error: ", error.message);
  }
})
```

This popup the Bit54 Tranfer UI within the integrator interface for the user to initiate a money transfer payment. If `redirect` is set to `true` the user will be redirected to *transfer.bit54.com* (not live).  

#### Example API Call for Integration

```ts
// Example of initiating a money transfer
const transaction = await bit54.createTransfer({
   amount: 100,
   senderCurrency: "USD",
   recipientCurrency: "NGN",
   senderInfo: user,
   recipientInfo: recipient,
});
```

`recipientInfo` may be a bank account, mobile money wallet, or crypto wallet. Banks could easily pass in the net amount after taking their fee. The bank would have a UI that clearly shows how much the recipient gets and fee deducted (including Bit54 $1 fee).

### Why Banks and Fintechs Should Integrate Bit54

- **Scalable**: Partner with us to provide instant access to cross-border payments in 54 African countries.
- **Profitable**:  We charge only $1, leaving room for banks and fintechs to add their own margin on top.
- **Compliant**: We handle all KYC requirements, leveraging DIDs and VCs to ensure smooth transactions.
- **Transparent**: Provide your customers with the best PFI options, while building trust and transparency in the process.

---

### Conclusion

We are redefining cross-border payments in Africa by **TBDEX**, and a decentralized network of **PFIs**. With lower fees via Lightning networks, faster transactions, and flexible integration options, we offer a unique solution to the continent's remittance challenges.
