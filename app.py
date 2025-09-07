from flask import Flask, render_template, jsonify, request
from flask_cors import CORS
import json
from datetime import datetime

app = Flask(__name__)
CORS(app)

# Dados dos empreendimentos (em produção, viria de uma base de dados)
EMPREENDIMENTOS = [
    {
        "id": 1,
        "nome": "UPTOWN",
        "bairro": "savassi",
        "status": "lancamento",
        "tipologia": "3-suites",
        "suites": "3 suítes",
        "area": "120,54 m²",
        "vagas": "2 vagas",
        "preco": 850000,
        "preco_formatado": "R$ 850.000",
        "porcentagemObra": 15,
        "image": "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=250&fit=crop",
        "descricao": "Empreendimento moderno no coração da Savassi",
        "caracteristicas": [
            "Área de lazer completa",
            "Academia",
            "Salão de festas",
            "Playground",
            "Portaria 24h"
        ],
        "data_entrega": "2025-12-01",
        "financiamento": True,
        "construtora": "Prime Construtora"
    },
    {
        "id": 2,
        "nome": "DOWNTOWN",
        "bairro": "lourdes",
        "status": "em-construcao",
        "tipologia": "2-suites",
        "suites": "2 suítes",
        "area": "67,84 a 128,26 m²",
        "vagas": "2 vagas",
        "preco": 650000,
        "preco_formatado": "R$ 650.000",
        "porcentagemObra": 65,
        "image": "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=250&fit=crop",
        "descricao": "Torre moderna em Lourdes com vista panorâmica",
        "caracteristicas": [
            "Vista panorâmica",
            "Piscina infinity",
            "Espaço gourmet",
            "Pet place",
            "Coworking"
        ],
        "data_entrega": "2026-06-01",
        "financiamento": True,
        "construtora": "Prime Construtora"
    },
    {
        "id": 3,
        "nome": "PARADISO LOURDES",
        "bairro": "lourdes",
        "status": "pronto",
        "tipologia": "2-suites",
        "suites": "2 e 3 suítes",
        "area": "75,90 a 128,94 m²",
        "vagas": "2 vagas",
        "preco": 720000,
        "preco_formatado": "R$ 720.000",
        "porcentagemObra": 100,
        "image": "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=250&fit=crop",
        "descricao": "Residencial pronto para morar em Lourdes",
        "caracteristicas": [
            "Pronto para morar",
            "Localização privilegiada",
            "Acabamento premium",
            "Área verde",
            "Segurança 24h"
        ],
        "data_entrega": "2024-01-01",
        "financiamento": True,
        "construtora": "Prime Construtora"
    },
    {
        "id": 4,
        "nome": "ELITE CENTER",
        "bairro": "centro",
        "status": "financiado",
        "tipologia": "1-suite",
        "suites": "1 suíte",
        "area": "45,30 m²",
        "vagas": "1 vaga",
        "preco": 380000,
        "preco_formatado": "R$ 380.000",
        "porcentagemObra": 100,
        "image": "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=250&fit=crop",
        "descricao": "Apartamentos compactos no centro da cidade",
        "caracteristicas": [
            "Localização central",
            "Próximo ao metrô",
            "Comércio na região",
            "Fácil acesso",
            "Investimento seguro"
        ],
        "data_entrega": "2025-08-01",
        "financiamento": True,
        "construtora": "Prime Construtora"
    },
    {
        "id": 5,
        "nome": "BELVEDERE RESIDENCE",
        "bairro": "belvedere",
        "status": "lancamento",
        "tipologia": "4-suites",
        "suites": "4 suítes",
        "area": "180,75 m²",
        "vagas": "3 vagas",
        "preco": 1200000,
        "preco_formatado": "R$ 1.200.000",
        "porcentagemObra": 25,
        "image": "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=250&fit=crop",
        "descricao": "Residencial de luxo no Belvedere",
        "caracteristicas": [
            "Alto padrão",
            "Vista panorâmica",
            "Área de lazer completa",
            "Spa e wellness",
            "Concierge"
        ],
        "data_entrega": "2026-12-01",
        "financiamento": True,
        "construtora": "Prime Construtora"
    },
    {
        "id": 6,
        "nome": "FUNCIONÁRIOS TOWER",
        "bairro": "funcionarios",
        "status": "em-construcao",
        "tipologia": "2-suites",
        "suites": "2 suítes",
        "area": "85,40 m²",
        "vagas": "2 vagas",
        "preco": 580000,
        "preco_formatado": "R$ 580.000",
        "porcentagemObra": 45,
        "image": "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=250&fit=crop",
        "descricao": "Torre moderna no bairro Funcionários",
        "caracteristicas": [
            "Localização nobre",
            "Próximo ao centro",
            "Área gourmet",
            "Academia",
            "Rooftop"
        ],
        "data_entrega": "2026-03-01",
        "financiamento": True,
        "construtora": "Prime Construtora"
    }
]

# Simulação de dados para contatos e interesses
CONTATOS = []
INTERESSES = []

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/sobre')
def sobre():
    return render_template('sobre.html')

@app.route('/contato')
def contato():
    return render_template('contato.html')

@app.route('/api/empreendimentos')
def get_empreendimentos():
    """Retorna todos os empreendimentos ou filtrados"""
    bairro = request.args.get('bairro')
    status = request.args.get('status')
    tipologia = request.args.get('tipologia')
    
    empreendimentos = EMPREENDIMENTOS.copy()
    
    # Aplicar filtros
    if bairro:
        empreendimentos = [e for e in empreendimentos if e['bairro'] == bairro]
    
    if status:
        empreendimentos = [e for e in empreendimentos if e['status'] == status]
    
    if tipologia:
        empreendimentos = [e for e in empreendimentos if e['tipologia'] == tipologia]
    
    return jsonify({
        'success': True,
        'data': empreendimentos,
        'total': len(empreendimentos)
    })

@app.route('/api/empreendimentos/<int:empreendimento_id>')
def get_empreendimento(empreendimento_id):
    """Retorna um empreendimento específico"""
    empreendimento = next((e for e in EMPREENDIMENTOS if e['id'] == empreendimento_id), None)
    
    if not empreendimento:
        return jsonify({
            'success': False,
            'message': 'Empreendimento não encontrado'
        }), 404
    
    return jsonify({
        'success': True,
        'data': empreendimento
    })

@app.route('/api/contato', methods=['POST'])
def api_contato():
    """Recebe mensagens de contato"""
    data = request.get_json()
    
    # Validação básica
    required_fields = ['nome', 'email', 'telefone', 'mensagem']
    for field in required_fields:
        if field not in data or not data[field]:
            return jsonify({
                'success': False,
                'message': f'Campo {field} é obrigatório'
            }), 400
    
    # Em produção, salvar no banco de dados e enviar email
    contato_data = {
        'id': len(CONTATOS) + 1,
        'nome': data['nome'],
        'email': data['email'],
        'telefone': data['telefone'],
        'mensagem': data['mensagem'],
        'empreendimento_id': data.get('empreendimento_id'),
        'data_contato': datetime.now().isoformat(),
        'status': 'novo'
    }
    
    # Simular salvamento
    CONTATOS.append(contato_data)
    
    return jsonify({
        'success': True,
        'message': 'Mensagem enviada com sucesso! Entraremos em contato em breve.',
        'data': contato_data
    })

@app.route('/api/interesse', methods=['POST'])
def registrar_interesse():
    """Registra interesse em um empreendimento"""
    data = request.get_json()
    
    required_fields = ['nome', 'telefone', 'empreendimento_id']
    for field in required_fields:
        if field not in data or not data[field]:
            return jsonify({
                'success': False,
                'message': f'Campo {field} é obrigatório'
            }), 400
    
    # Verificar se empreendimento existe
    empreendimento = next((e for e in EMPREENDIMENTOS if e['id'] == data['empreendimento_id']), None)
    if not empreendimento:
        return jsonify({
            'success': False,
            'message': 'Empreendimento não encontrado'
        }), 404
    
    interesse_data = {
        'id': len(INTERESSES) + 1,
        'nome': data['nome'],
        'telefone': data['telefone'],
        'email': data.get('email', ''),
        'empreendimento_id': data['empreendimento_id'],
        'empreendimento_nome': empreendimento['nome'],
        'data_interesse': datetime.now().isoformat(),
        'status': 'novo'
    }
    
    INTERESSES.append(interesse_data)
    
    return jsonify({
        'success': True,
        'message': 'Interesse registrado com sucesso!',
        'data': interesse_data
    })

@app.route('/api/filtros')
def get_filtros():
    """Retorna opções de filtros"""
    bairros = list(set([e['bairro'] for e in EMPREENDIMENTOS]))
    status = list(set([e['status'] for e in EMPREENDIMENTOS]))
    tipologias = list(set([e['tipologia'] for e in EMPREENDIMENTOS]))
    
    return jsonify({
        'success': True,
        'data': {
            'bairros': sorted(bairros),
            'status': sorted(status),
            'tipologias': sorted(tipologias)
        }
    })

@app.route('/api/stats')
def get_stats():
    """Retorna estatísticas dos empreendimentos"""
    total_empreendimentos = len(EMPREENDIMENTOS)
    em_construcao = len([e for e in EMPREENDIMENTOS if e['status'] == 'em-construcao'])
    prontos = len([e for e in EMPREENDIMENTOS if e['status'] == 'pronto'])
    lancamentos = len([e for e in EMPREENDIMENTOS if e['status'] == 'lancamento'])
    
    preco_medio = sum([e['preco'] for e in EMPREENDIMENTOS]) / total_empreendimentos
    
    return jsonify({
        'success': True,
        'data': {
            'total_empreendimentos': total_empreendimentos,
            'em_construcao': em_construcao,
            'prontos': prontos,
            'lancamentos': lancamentos,
            'preco_medio': preco_medio
        }
    })

# Error handlers
@app.errorhandler(404)
def not_found(error):
    return jsonify({
        'success': False,
        'message': 'Endpoint não encontrado'
    }), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({
        'success': False,
        'message': 'Erro interno do servidor'
    }), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)