import hashlib

password = 'test'
hashed_password = hashlib.sha256(password.encode()).hexdigest()
print(hashed_password)