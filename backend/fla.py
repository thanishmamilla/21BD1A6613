from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzE3MDc4NTI4LCJpYXQiOjE3MTcwNzgyMjgsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6ImQwY2IwZmU2LTg1NjEtNDBiYS1iOGVkLTQ0ZDNhYTgzMjg4ZSIsInN1YiI6InRoYW5pc2htYW1pbGxhMDVAZ21haWwuY29tIn0sImNvbXBhbnlOYW1lIjoiZ29NYXJ0IiwiY2xpZW50SUQiOiJkMGNiMGZlNi04NTYxLTQwYmEtYjhlZC00NGQzYWE4MzI4OGUiLCJjbGllbnRTZWNyZXQiOiJ0TEhuVWxBREFPVUJnbWpGIiwib3duZXJOYW1lIjoiVGhhbmlzaEt1bWFyIiwib3duZXJFbWFpbCI6InRoYW5pc2htYW1pbGxhMDVAZ21haWwuY29tIiwicm9sbE5vIjoiMjFiZDFhNjYxMyJ9.19PfZHtVfRBsozgJPGv17tWFcz87JUxG7g88rD8E_F0"

def fetch_products(company, category, top, min_price, max_price, sort_by=None, sort_order=None, page=1):
    url = f"http://20.244.56.144/test/companies/{company}/categories/{category}/products"
    params = {
        'top': top,
        'minPrice': min_price,
        'maxPrice': max_price,
        'sort_by': sort_by,
        'sort_order': sort_order,
        'page': page
    }
    print(url)
    headers = {
        "Authorization": f"Bearer {TOKEN}"
    }
    try:
        response = requests.get(url, params=params, headers=headers)
        if response.status_code == 200:
            return response.json()
        else:
            return None
    except requests.exceptions.RequestException as e:
        print(f"Error fetching products: {e}")
        return None

def generate_product_id(product):
    return hash(product.get('name', '') + str(product.get('price', '')))

@app.route('/categories/<categoryname>/products', methods=['GET'])
def get_products(categoryname):
    try:
        print(True)

        top = int(request.args.get('top', 10))
        min_price = int(request.args.get('minPrice', 0))
        max_price = int(request.args.get('maxPrice', 99999))
        sort_by = request.args.get('sortBy')
        sort_order = request.args.get('sortOrder')
        page = int(request.args.get('page', 1))
        
        products = fetch_products(categoryname, top, min_price, max_price, sort_by, sort_order, page)
        
        if products:
            for product in products:
                product['id'] = generate_product_id(product)
            return jsonify(products)
        else:
            return jsonify({'error': 'Failed to fetch products from e-commerce APIs'}), 500
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/categories/<categoryname>/products/<productid>', methods=['GET'])
def get_product_by_id(categoryname, productid):
    try:
        products = fetch_products(categoryname, top=1, min_price=0, max_price=float('inf'))
        if products:
            for product in products:
                if product.get('id') == int(productid):
                    return jsonify(product)
            return jsonify({'error': 'Product not found'}), 404
        else:
            return jsonify({'error': 'Failed to fetch products from e-commerce APIs'}), 500
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run()
