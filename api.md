Message
instance
.from() ⇒ Contact | null
.to() ⇒ Contact | null
.room() ⇒ Room | null
.content()
.text() ⇒ string
.say(textOrContactOrFile) ⇒ Promise <void>
.type() ⇒ MessageType
.self() ⇒ boolean
.mention() ⇒ Promise <Contact []>
.mentionSelf() ⇒ Promise <boolean>
.forward(to) ⇒ Promise <void>
.date() ⇒ Date
.age() ⇒ number
.file()
.toFileBox() ⇒ Promise <FileBox>
.toContact() ⇒ Promise <Contact>
.toUrlLink() ⇒ Promise <UrlLink>
static
.find() ⇒ Promise <Message>
.findAll() ⇒ Promise <Message []>


