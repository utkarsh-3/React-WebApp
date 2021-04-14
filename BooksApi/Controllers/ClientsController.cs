using ClientsApi.Models;
using ClientsApi.Services;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;


namespace ClientsApi.Controllers
{
    
    [Route("api/[controller]")]
    [ApiController]
    
    public class ClientsController : ControllerBase
    {
      
        private readonly IClientRepository<Client> _clientService;

        public ClientsController(IClientRepository<Client> clientService)
        {
            _clientService = clientService;
         
        }
        
        
        [EnableCors("Policy")]
        [HttpGet]
        public ActionResult<List<Client>> Get() =>
            _clientService.Get();
        
        
        [EnableCors("Policy")]
        [HttpGet("{Id}", Name = "GetClient")]
        public ActionResult<Client> Get(string id)
        {

            var client = _clientService.Get(id);

            if (client == null)
            {
                return NotFound();
            }

            return client;
        }

        [HttpPut("{id:maxlength(24)}")]
        public IActionResult Update([FromBody] Client clientIn)
        {
            var client = _clientService.Get(clientIn.ClientId);

            if (client == null)
            {
                return NotFound();
            }

            _clientService.Update(clientIn.ClientId, clientIn);

            return NoContent();
        }
        
        [EnableCors("Policy")]
        [HttpGet("{firstName}/{lastName}/{Email}")]
        public ActionResult<Client> Check(string firstName,string lastName,string email)
        {

            var client = _clientService.Validate(firstName,lastName,email);

            if (client == null)
            {
                return NotFound();
            }

            return client;
        }


        [EnableCors("Policy")]
        [HttpPost]
        public ActionResult<Client> Create([FromBody]Client client)
        {
            _clientService.Add(client);

            return _clientService.Get( client.ClientId);
        }

        
        [HttpDelete("{id:maxlength(24)}")]
        public IActionResult Delete(string id)
        {
            var client = _clientService.Get(id);

            if (client == null)
            {
                return NotFound();
            }

            _clientService.Delete(client.ClientId);

            return NoContent();
        }
        
    }
}